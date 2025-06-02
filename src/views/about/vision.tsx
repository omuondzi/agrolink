import { H2, Paragraph } from "../../components/typography";

const VisionAndMission = () => {
  const SvgLetterImage = ({
    imageUrl,
    letter = "A",
  }: {
    imageUrl: string;
    letter: string;
  }) => (
    <svg width="300" height="300" viewBox="0 0 150 150">
      <defs>
        <clipPath id="text-clip">
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="200"
            fontWeight="bold"
            fontFamily="Arial"
          >
            {letter}
          </text>
        </clipPath>
      </defs>
      <image
        href={imageUrl}
        width="300"
        height="300"
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#text-clip)"
      />
    </svg>
  );

  return (
    <section className="bg-lightbg py-[1rem]">
      <section className="container mx-auto flex flex-col md:flex-row items-center gap-[3rem]">
        <div>
          <SvgLetterImage imageUrl="/images/tea.jpg" letter="A" />
        </div>
        <div className="">
          <H2 className="text-primary">Our Mission</H2>
          <Paragraph className="text-justify hyphens-auto">
            To empower small-scale farmers by providing a transparent,
            efficient, and accessible digital marketplace that connects them
            directly with buyers, eliminates exploitative intermediaries, and
            fosters fair trade within the agricultural value chain.
          </Paragraph>
        </div>
        <div>
          <H2 className="text-primary">Our Vision</H2>
          <Paragraph className="text-justify hyphens-auto">
            To become Africa’s leading digital agriculture platform,
            revolutionizing how fresh produce is bought and sold by building
            inclusive, tech-driven ecosystems that uplift rural communities and
            ensure sustainable food supply for all.
          </Paragraph>
        </div>
      </section>
    </section>
  );
};

export default VisionAndMission;
