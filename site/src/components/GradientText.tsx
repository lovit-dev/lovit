function GradientText({ children }: { children: string }) {
  return (
    <span className='relative inline-block cursor-pointer bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent transition-transform duration-300 hover:scale-110 hover:-rotate-2'>
      {children}
    </span>
  );
}

export default GradientText;
