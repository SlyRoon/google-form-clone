
import { useGetFormsQuery } from '../store/generated/graphql';

export const HomePage = () => {

  const { data, isLoading, error } = useGetFormsQuery();

  if (isLoading) return <h2>⏳ Завантаження форм...</h2>;
  if (error) return <h2>❌ Помилка при завантажуванні данних з сервера!</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Мої форми</h1>
      

      {!data?.forms || data.forms.length === 0 ? (
        <p>Форм немає , будь першим та створи її </p>
      ) : (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {data.forms.map((form) => (
            <div 
              key={form.id} 
              style={{ 
                border: '1px solid #ccc', 
                padding: '15px', 
                borderRadius: '8px', 
                minWidth: '250px' 
              }}
            >
              <h3>{form.title}</h3>
              {form.description && <p>{form.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};