import Card from "./Card";

const SelectSkinType = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
      {["Normal", "Oily", "Dry", "Combination", "Not sure"].map(
        (item, index) => (
          <Card key={index}>
            <h3 className="text-xl font-semibold">{item}</h3>
          </Card>
        )
      )}
    </div>
  );
};

export default SelectSkinType;
