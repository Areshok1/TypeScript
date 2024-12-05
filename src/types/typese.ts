// Тип для об'єкта, який отримуємо з API
export type Post = {
    id: number;        
    title: string;      
    body: string;     
  };
  
  // Тип для елементів кнопок
  export type ButtonElement = HTMLButtonElement;
  
  // Тип для загальних HTML-елементів
  export type HTMLElementType = HTMLElement;
  
  // Тип для масиву об'єктів Post, який ми очікуємо отримати від сервера
  export type FetchResponse = Array<{ id: number; title: string; body: string }>;
  