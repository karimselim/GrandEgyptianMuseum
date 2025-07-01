import React from "react";
import about_img from "../../assets/about.png";
import play_icon from "../../assets/play-icon.png";
import Image from "next/image";
import Link from "next/link";

const Ar = ({ setPlayState }) => {
  return (
    <section className="about mx-[7%] my-24 flex flex-row-reverse justify-between max-md:flex-col gap-12">
      <aside className="about-left flex-basis-[40%] min-w-[40%] relative max-md:flex-basis-full max-md:order-2 h-fit">
        <Image
          src={about_img}
          alt=""
          className="about-img w-full rounded-[10px] lg:min-w-[400px] mt-20"
        />
        <Image
          src={play_icon}
          alt=""
          className="play-icon w-[60px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] cursor-pointer"
          onClick={() => {
            setPlayState(true);
          }}
        />
      </aside>
      <aside className="about-right flex-basis-[56%] max-md:flex-basis-full">
        <h2 className="text-[45px] text-white my-2">Augmented Reality</h2>
        <Link
          className="font-semibold mb-4 text-xl underline text-blue-600"
          href="/"
        >
          Click here to use it
        </Link>
        <p className="text-[#eee] text-[18px] mb-6 leading-relaxed">
          In the Grand Egyptian Museum project, we introduced Augmented Reality
          to transform how visitors engage with ancient artifacts. Instead of
          simply looking at static displays, users can now explore 3D
          reconstructions that show how these artifacts originally looked and
          were used. This adds a powerful sense of presence and connection to
          the past.
        </p>

        <p className="text-[#eee] text-[18px] mb-6 leading-relaxed">
          Through AR, we digitally recreate scenes from ancient Egyptian life —
          temples, rituals, daily activities — allowing visitors to step into
          environments that would otherwise be lost to time. It turns a
          traditional museum experience into an interactive journey that blends
          storytelling with cutting-edge technology.
        </p>

        <p className="text-white text-[18px] mb-6 leading-relaxed">
          This technology also opens new doors for education. Students and
          guests can interact with artifacts in ways that foster curiosity and
          deeper understanding. It brings history to life, making it not just
          something to observe, but something to explore and remember.
        </p>
      </aside>
    </section>
  );
};

export default Ar;
