import Card from "./Card";

const complexionOptions = [
  {
    title: "Pale",
    description:
      "The fairest of them all! Often delicate and prone to sunburn.",
    icon: "👩🏻‍🦰",
  },
  {
    title: "Light",
    description:
      "A natural brightness — usually burns but with some luck it can tan.",
    icon: "👩🏻",
  },
  {
    title: "Medium",
    description:
      "Burns sometimes, tans uniformly, carries the warmth of golden sunsets.",
    icon: "👩🏼",
  },
  {
    title: "Deep",
    description:
      "Rich and dark skin tones that radiate depth. Burns rarely, tans very easily.",
    icon: "👩🏽",
  },
  {
    title: "Dark",
    description: "The deepest, most vibrant tones. Never burns!",
    icon: "👩🏾‍🦱",
  },
];

const SelectComplexion = () => {
  return (
    <>
      <p className="hidden lg:block -mt-6">Select two from the options</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-x-4 lg:gap-y-8">
        {complexionOptions.map((item, index) => (
          <Card
            key={index}
            className="w-full lg:w-[260px]  h-[210px] lg:h-[250px]"
          >
            <div className="space-y-1 ">
              <span>{item.icon}</span>
              <h2 className="text-lg lg:text-xl font-semibold">{item.title}</h2>
              <p className="text-sm lg:text-lg font-normal">
                {item.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default SelectComplexion;
