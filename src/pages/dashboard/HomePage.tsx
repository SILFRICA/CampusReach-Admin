import React from "react";
import { Link } from "react-router-dom";
import icon1 from "../../assets/information.fb3bdf82be8bafd38b453f4ba84198a8.svg";
import icon2 from "../../assets/Valuable-data.dca55fd936a5650375c481775d1fb1d8.svg";
import icon4 from "../../assets/monitor.857de4ab222ac055f3b3465b95342488.svg";

const HomePage: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Unlock the Benefits of Collaborating with Silfrica for Your
            Institution
          </h2>

          <p className="mt-4 text-gray-300">
            Manage institutions multiple information architecture on one
            platform.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link
            to={"/login"}
            className="inline-block rounded bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring focus:ring-yellow-400"
          >
            See your campus &rarr;
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <a
            className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-teal-500/10"
            href="#"
          >
            <img src={icon1} alt="icon" />

            <h2 className="mt-4 text-xl font-bold text-white">
              Talent supply
            </h2>

            <p className="mt-1 text-sm text-gray-300">
              Showcase the institution's talents and creativity to a wider
              audience.
            </p>
          </a>

          <a
            className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-teal-500/10"
            href="#"
          >
            <img src={icon4} alt="icon" />

            <h2 className="mt-4 text-xl font-bold text-white">
              Monitoring Policies
            </h2>

            <p className="mt-1 text-sm text-gray-300">
              Implement and monitor compliance with institutional policies, with
              convenient feedback channels.
            </p>
          </a>

          <a
            className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-teal-500/10"
            href="#"
          >
            <img src={icon2} alt="icon" />

            <h2 className="mt-4 text-xl font-bold text-white">
              Institutional Data
            </h2>

            <p className="mt-1 text-sm text-gray-300">
              Access valuable data that can help the institution to make
              informed decisions.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
