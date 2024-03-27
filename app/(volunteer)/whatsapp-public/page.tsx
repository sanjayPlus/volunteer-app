"use client"
import React, { useEffect, useState } from 'react'
import Whatsapp from '../whatsapp/page';
import MobileContainer from '@/components/MobileContainer';
import axios from 'axios';
import VOLUNTEER_URL from '@/config/VOLUNTEER_URL';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { MdArrowBackIosNew } from 'react-icons/md';

function WhatsappPublic() {
    const router = useRouter();
    const [booth, setBooth] = useState("");
    const [district, setDistrict] = useState("");
    const [assembly, setAssembly] = useState("");
    const [constituency, setConstituency] = useState("");
    const [assemblyList, setAssemblyList] = useState([]);
    const [constituencyList, setConstituencyList] = useState([]);
    const [boothList, setBoothList] = useState([]);
    const [link, setLink] = useState("");
    const [membersNo, setMembersNo] = useState("");
  
    useEffect(() => {
      if (!localStorage.getItem("volunteer-token")) {
        router.push("/login");
      }
      axios
        .get(`${VOLUNTEER_URL}/volunteer/protected`, {
          headers: {
            "x-access-token": localStorage.getItem("volunteer-token"),
          },
        })
        .then(async (response) => {
          if (response.status === 200) {
            axios
              .get(`${VOLUNTEER_URL}/volunteer/volunteer-details`, {
                headers: {
                  "x-access-token": localStorage.getItem("volunteer-token"),
                },
              })
              .then((userResponse) => {
                if (userResponse.status === 200) {
                  setDistrict(userResponse.data.volunteer.district);
                  setConstituency(userResponse.data.volunteer.assembly);
                  axios
                    .get(
                      `${VOLUNTEER_URL}/admin/state-districtV1?district=${userResponse.data.volunteer.district}`,
                      {
                        // Use the updated district value
                        headers: {
                          "x-access-token": localStorage.getItem("volunteer-token"),
                        },
                      }
                    )
                    .then((response) => {
                      if (response.status === 200) {
                        setConstituencyList(response.data);
                      }
                    })
                    .catch((err) => {
                      console.log(err.response.data);
                    });
                }
              });
          } else {
            localStorage.removeItem("volunteer-token");
            router.push("/dmc");
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("volunteer-token");
          router.push("/dmc");
        });
    }, []);
    const handleConstitunecyChange = (e: any) => {
      if (district == "") {
        toast.error("Select The District");
      }
      const selectedConstitunecy = e.target.value; // Get the selected district from the event
  
      setConstituency(selectedConstitunecy); // Update the district state with the selected district
  
      axios
        .get(
          `${VOLUNTEER_URL}/admin/state-districtV1?district=${district}&constituency=${selectedConstitunecy}`,
          {
            // Use the updated district value
            headers: { "x-access-token": localStorage.getItem("volunteer-token") },
          }
        )
        .then((userResponse) => {
          if (userResponse.status === 200) {  
              setAssemblyList(userResponse.data);
              setBoothList([]);
              setAssembly("");
              setBooth("");
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };
    const handleAssemblyChange = (e: any) => {
      if (district == "") {
        toast.error("Select The District");
      }
      if (constituency == "") {
        toast.error("Select The Constituency");
      }
      const selectedAssembly = e.target.value; // Get the selected district from the event
  
      setAssembly(selectedAssembly); // Update the district state with the selected district
  
      axios
        .get(
          `${VOLUNTEER_URL}/admin/state-districtV1?district=${district}&constituency=${constituency}&assembly=${selectedAssembly}`,
          {
            // Use the updated district value
            headers: { "x-access-token": localStorage.getItem("volunteer-token") },
          }
        )
        .then((userResponse) => {
          if (userResponse.status === 200) {
            setBoothList(userResponse.data);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };
    const handleSubmit = () => {
      axios
        .post(
          `${VOLUNTEER_URL}/volunteer/add-whatsapp-public`,
          {
            assembly,
            constituency,
            booth,
            membersNo,
            link
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("volunteer-token"),
            },
          }
        )
        .then((response) => {
          toast.success("Report added successfully");
        }).catch((err) => {
          console.log(err);
        })
    }
  return (
   <>
        <MobileContainer>
        <div className="w-full bg-[##F1F4FF] flex flex-col items-center relative bg-slate-100">
        <div className=" w-full bg-white/100 mb-7 box-shodow-lg box-shagow-black flex flex-col   ">
          <MdArrowBackIosNew
            className=" text-lg cursor-pointer absolute left-4 mt-3   text-black z-50"
            onClick={() => router.back()}
          />
          <h1 className=" text-xl text-center font-bold mt-5 drop-shadow-lg text-black mb-4">
            {" "}
            Add Whatsapp Public
          </h1>
        </div>
        <div className="w-[80%] gap-4 flex flex-col items-center justify-center ">

          <div className="max-w-sm mx-auto">
            <label
              htmlFor="link"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Link
            </label>
            <input
              type="text"
              id="link"
              className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-900 focus:border-blue-900 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder='Enter Link'
            />
          </div>
          <div className="max-w-sm mx-auto">
            <label
              htmlFor="membersNo"
              
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Members No
            </label>
            <input
              type="text"
              id="membersNo"
              className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-900 focus:border-blue-900 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
              value={membersNo}
              onChange={(e) =>setMembersNo(e.target.value)}
              placeholder='Enter Members No'
            />
          </div>
          <div className="max-w-sm mx-auto">
            <label
              htmlFor="constitunecy"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Select Assembly
            </label>
            <select
              id="constitunecy"
              onChange={(e) => handleConstitunecyChange(e)}
              className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-900 focus:border-blue-900 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
            >
              <option>Select an option</option>
              {constituencyList.map((assembly: any) => ( 
                <option key={assembly} value={assembly}>
                  {assembly}
                </option>
              ))}
            </select>
          </div>
          <div className="max-w-sm mx-auto">
            <label
              htmlFor="assembly"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Select Mandlam
            </label>
            <select
              id="assembly"
              onChange={(e) => handleAssemblyChange(e)}
              className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-900 focus:border-blue-900 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
            >
              <option>Select an option</option>
              {assemblyList.map((assembly: any) => (
                <option key={assembly} value={assembly}>
                  {assembly}
                </option>
              ))}
            </select>
          </div>
          <div className="max-w-sm mx-auto">
            <label
              htmlFor="booth"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Select Booth
            </label>
            <select
              id="booth"
              onChange={(e) => setBooth(e.target.value)}
              className="bg-gray-50 mb-2 border border-gray-300 text-sm rounded-xl overflow-x-scroll focus:ring-blue-900 focus:border-blue-800 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-800 dark:focus:border-blue-900"
            >
              <option>Select an option</option>
              {boothList.map((booth: any) => (
                <option key={booth} value={booth.number}>
                  {booth.number}
                </option>
              ))}
            </select>
          </div>
          <button
            className="w-[80%] p-2 bg-blue-400 text-white rounded-lg mb-5"
                onClick={handleSubmit}
          >
            Add WhatsApp
          </button>
        </div>
      </div>
        </MobileContainer>
   </>
  )
}

export default WhatsappPublic