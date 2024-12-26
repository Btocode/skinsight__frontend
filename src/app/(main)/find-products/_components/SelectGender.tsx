import Card from "./Card";

const SelectGender = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-x-4 lg:gap-y-8">
      {["Male", "Female", "I do prefer not to say"].map((item, index) => (
        <Card key={index}>
          <h3 className="text-xl font-semibold">{item}</h3>
        </Card>
      ))}
    </div>
  );
};

export default SelectGender;
