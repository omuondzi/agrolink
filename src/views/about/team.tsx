import { Image } from "@heroui/react";

const TeamSection = () => {
  return (
    <>
      {/* Meet Our Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl text-center font-bold">
            Meet Our Team
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="container grid md:grid-cols-3 lg:grid-cols-4 gap-[2rem] mx-auto">
          {[
            {
              name: "Eric Kamau",
              bio: "Tema lead.",
              image: "/images/dp2.png",
            },
            {
              name: "Hillary Omondi",
              bio: "Developer",
              image: "/images/dp2.png",
            },
            {
              name: "Steven Gachoka",
              bio: "Tester",
              image: "/images/dp2.png",
            },
            {
              name: "Sharon Kamau",
              bio: "Designer",
              image: "/images/dp2.png",
            },
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={member.image}
                alt={member.name}
                width={300}
                height={250}
                className="rounded-[50%]"
              />
              <p className="pt-2">{member.name}</p>
              <p>{`"${member.bio}"`}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default TeamSection;
