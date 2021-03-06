import Head from "next/head";
import Image from "next/image";
import { StaffCard, StaffCardBig } from "../components/StaffCard";
const { gql, useQuery } = require("@apollo/client");
import { client } from "./_app";

export async function getStaticProps() {
  const { data: staffData } = await client.query({
    query: gql`
      query Staff {
        mitarbeiter(filter: { status: { _eq: "published" } }) {
          id
          status
          name
          stelle
          potrait {
            id
          }
        }
      }
    `,
  });

  const { data: aboutData } = await client.query({
    query: gql`
      query Staff {
        about {
          id
          uber_uns
          unser_ziel
        }
      }
    `,
  });

  if (!staffData || !aboutData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      staff: await staffData.mitarbeiter,
      about: await aboutData.about,
    },
    revalidate: 60,
  };
}

const fuehrung = [
  {
    name: "Baier Herbert",
    stelle: "Geschäftsführer",
    potrait: "8bcbef25-ca51-4db0-8b17-a5e667c8952c",
    potrait2: "0d69e20d-3429-4497-8831-bba96e2bb31d",
  },
  {
    name: "Gruber Christian",
    stelle: "Gschf. u. PDL",
    potrait: "5811593b-e634-4dab-af9e-57e99c4c4c01",
    potrait2: "2f3abb2b-21b4-471a-8f90-bed3ec12fb06",
  },
  // {
  //   name: "Theresa",
  //   stelle: "Stellv. PDL",
  //   potrait: "bf6b363b-67b2-4c52-bc45-25d793c13d6b",
  //   potrait2: "f4bd3d1b-c733-4d1f-8d21-56eadead95c8",
  // },
  {
    name: "Pepper",
    stelle: "Seniorenbegleithund",
    potrait: "ba5dd4f0-eacb-4225-b4cb-a018e4332170",
    potrait2: "6b425d3b-ec38-49d2-b05e-7528846cea84",
  },
  {
    name: "",
    stelle: "",
    potrait: "66796dc7-378f-4084-9436-f9d2427745a0",
    potrait2: "66796dc7-378f-4084-9436-f9d2427745a0",
  },
];

export default function Home({ staff, about }) {
  return (
    <div className="">
      <Head>
        <title>AugustusPflege - Über Uns</title>
      </Head>

      <div className="px-4 2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9">
        <div className="flex flex-col justify-between gap-8 lg:flex-row">
          <div className="flex flex-col justify-center w-full lg:w-5/12">
            <h1 className="pb-4 text-3xl font-bold leading-9 text-gray-800 lg:text-4xl">
              Über Uns
            </h1>
            <div
              className="text-base font-normal leading-6 text-gray-600"
              dangerouslySetInnerHTML={{ __html: about.uber_uns }}
            ></div>
          </div>
          <div className="flex items-center w-full lg:w-8/12">
            <Image
              className="object-scale-down w-full h-full"
              width={1900}
              height={680}
              src={
                process.env.NEXT_PUBLIC_IMG_BASEURL +
                "53525fb2-9ee6-41aa-9989-9d79ecb0b5b5"
              }
              alt=""
            />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 pt-10 lg:flex-row">
          <div className="flex flex-col justify-center w-full lg:w-5/12">
            <h1 className="pb-4 text-3xl font-bold leading-9 text-gray-800 lg:text-4xl">
              Unser Ziel
            </h1>
            <div
              className="text-base font-normal leading-6 text-gray-600"
              dangerouslySetInnerHTML={{ __html: about.unser_ziel }}
            ></div>
          </div>
          <div className="w-full lg:w-8/12 lg:pt-8">
            <h1 className="pb-4 text-3xl font-bold leading-9 text-center text-gray-800 lg:text-4xl">
              Unser Team
            </h1>
            <div className="grid grid-cols-1 rounded-md shadow-lg md:grid-cols-4 sm:grid-cols-2 lg:gap-4">
              {fuehrung.map((data) => (
                <StaffCardBig
                  key={data.name}
                  potrait={data.potrait}
                  potrait2={data.potrait2}
                  name={data.name}
                  stelle={data.stelle}
                />
              ))}

              {staff.map((staff) => (
                <StaffCard
                  key={staff.id}
                  potrait={staff.potrait.id}
                  name={staff.name}
                  stelle={staff.stelle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
