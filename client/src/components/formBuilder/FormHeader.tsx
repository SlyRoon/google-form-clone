interface FormHeaderProps {
  title: string;
  description: string;
  onTitleChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
}

export default function FormHeader({ title, description, onTitleChange, onDescriptionChange }: FormHeaderProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Назва форми</label>
          <input 
            type="text"
            placeholder="Наприклад: Опитування про якість обслуговування" 
            className="w-full px-4 py-2 text-xl font-bold border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            value={title} 
            onChange={(e) => onTitleChange(e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Опис</label>
          <textarea 
            placeholder="Додайте короткий опис для вашої форми..." 
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all min-h-[100px]"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)} 
          />
        </div>
      </div>
    </div>
  )
}