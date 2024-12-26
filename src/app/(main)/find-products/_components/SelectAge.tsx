import Card from "./Card";

const ages = [
  "13-17",
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  ["54+ &", "fabulous"],
  "I'd prefer not to say",
];

const SelectAge = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-x-4 lg:gap-y-8">
      {ages.map((item, index) => (
        <Card key={index} className="w-full h-[160px]">
          {Array.isArray(item) ? (
            <>
              <h3 className="text-xl font-semibold">{item[0]}</h3>
              <h3 className="text-xl font-semibold">{item[1]}</h3>
            </>
          ) : (
            <h3 className="text-xl font-semibold">{item}</h3>
          )}
        </Card>
      ))}
    </div>
  );
};

export default SelectAge;
