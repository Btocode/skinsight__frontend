interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-100 p-4 text-center">
        © 2024 My Next.js Project. All rights reserved.
      </footer>
    </div>
  );
};
