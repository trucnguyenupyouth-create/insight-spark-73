import { useNavigate } from 'react-router-dom';
import { useExamList } from '../hooks/useExamList';
import { supabase } from '../api/analyticsApi';

export default function ExamListPage() {
  const { exams, loading, error } = useExamList();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Đang tải danh sách bài kiểm tra...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Lỗi: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Danh sách bài kiểm tra</h1>
          <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900">Đăng xuất</button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map(exam => (
            <div 
              key={exam.id} 
              onClick={() => navigate(`/exams/${exam.id}`)}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 truncate" title={exam.name}>
                    {exam.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${exam.analytics_cached ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {exam.analytics_cached ? '🟢 Đã phân tích' : '⚪ Chưa phân tích'}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Môn: {exam.topic || 'Không rõ'}</p>
                  <p>Lớp: {exam.grade_level}</p>
                  <p className="mt-2">Đã chấm: {exam.graded_count} / {exam.submission_count} bài</p>
                </div>
              </div>
            </div>
          ))}
          {exams.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
              Chưa có bài kiểm tra nào.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
