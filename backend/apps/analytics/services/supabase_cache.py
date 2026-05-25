from supabase import create_client
import os
import logging

logger = logging.getLogger(__name__)

def get_supabase_client():
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    if not url or not key:
        return None
    try:
        return create_client(url, key)
    except Exception as e:
        logger.error(f"Failed to create Supabase client: {e}")
        return None

def get_cached_analytics(exam_id: int):
    client = get_supabase_client()
    if not client:
        return None
    try:
        response = client.table("exam_analytics_cache").select("*").eq("exam_id", exam_id).execute()
        if response.data:
            return response.data[0]
    except Exception as e:
        logger.error(f"Failed to read from Supabase: {e}")
    return None

def upsert_cached_analytics(exam_id: int, payload: dict, model_name: str):
    client = get_supabase_client()
    if not client:
        return False
    try:
        client.table("exam_analytics_cache").upsert({
            "exam_id": exam_id,
            "analytics_json": payload,
            "model_name": model_name,
            "version": 1
        }, on_conflict="exam_id").execute()
        return True
    except Exception as e:
        logger.error(f"Failed to upsert to Supabase: {e}")
        return False
