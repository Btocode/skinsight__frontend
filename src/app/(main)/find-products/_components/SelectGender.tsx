import Card from "./Card";

const SelectGender = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
      {["Male", "Female", "I do prefer not to say"].map((item, index) => (
        <Card key={index}>
          <h3 className="text-xl font-semibold">{item}</h3>
        </Card>
      ))}
    </div>
  );
};

export default SelectGender;
