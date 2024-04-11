const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex flex-col justify-center p-10 gap-3">
      <div className="font-semibold text-3xl w-[80%] mx-auto">
        "The customer service I received was exceptional. The support team went
        above and beyond to address my concerns"
      </div>
      <div className="font-semibold text-xl w-[80%] mx-auto">
        Jules Winnfield
        <p className="text-slate-400 text-lg font-normal">CEO | Acme Inc</p>
      </div>
    </div>
  );
};

export default Quote;
