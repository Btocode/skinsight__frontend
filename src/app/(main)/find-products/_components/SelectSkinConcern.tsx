import Card from "./Card";

const skinConcerns = [
  ["Acne", "blemishes"],
  ["Wrinkles", "aging"],
  ["Scars", "pigmentation"],
  ["Hydrate", "moisturise"],
  ["Sensitive", "skin"],
  ["Pores", "dullness"],
];

const SelectSkinConcern = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-x-4 lg:gap-y-8">
      {skinConcerns.map((item, index) => (
        <Card key={index} circleClassName="rounded-lg">
          <h3 className="text-xl font-semibold">{item[0]} &</h3>
          <h3 className="text-xl font-semibold">{item[1]}</h3>
        </Card>
      ))}
    </div>
  );
};

export default SelectSkinConcern;
