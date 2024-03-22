"use client";
import React, { useEffect, useState } from "react";
import "./register.css"
import { useRouter } from "next/navigation";
import VOLUNTEER_URL from "@/config/VOLUNTEER_URL";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [booth, setBooth] = useState("");
  const [district, setDistrict] = useState("");
  const [assembly, setAssembly] = useState("");
  const [constituency, setConstituency] = useState("");
  const [phone, setPhone] = useState("");
  const [districtList, setDistrictList] = useState([]);

  const [constituencyList, setConstituencyList] = useState([]);

  const [assemblyList, setAssemblyList] = useState([]);

  const [boothList, setBoothList] = useState([]);
  const [boothRule, setBoothRule] = useState<any[]>([]);
  const [taskForce, setTaskForce] = useState<any>("");
  const router = useRouter();
  useEffect(() => {
    axios.get(VOLUNTEER_URL + "/admin/state-districtV1").then((res) => {
      setDistrictList(res.data);
    });
  }, []);
  const handleDistrictChange = (e: any) => {
    const selectedDistrict = e.target.value; // Get the selected district from the event

    setDistrict(selectedDistrict); // Update the district state with the selected district

    axios
      .get(
        `${VOLUNTEER_URL}/admin/state-districtV1?district=${selectedDistrict}`,
        {
          // Use the updated district value
          headers: { "x-access-token": localStorage.getItem("volunteer-token") },
        }
      )
      .then((userResponse) => {
        if (userResponse.status === 200) {
          setConstituencyList(userResponse.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleConstituencyChange = (e: any) => {
    if (district == "") {
      toast.error("Select The District");
    }
    const selectedConstituency = e.target.value; // Get the selected district from the event

    setConstituency(selectedConstituency); // Update the district state with the selected district

    axios
      .get(
        `${VOLUNTEER_URL}/admin/state-districtV1?district=${district}&constituency=${selectedConstituency}`,
        {
          // Use the updated district value
          headers: { "x-access-token": localStorage.getItem("volunteer-token") },
        }
      )
      .then((userResponse) => {
        if (userResponse.status === 200) {
          setAssemblyList(userResponse.data);
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let BoothRuleList:any = [];
    boothList.forEach((booth:any) => {
      BoothRuleList.push(booth?.number);
    })
    const token = localStorage.getItem("volunteer-token");
    axios
      .post(
        `${VOLUNTEER_URL}/volunteer/register`,
        {
          name,
          email,
          phone,
          password,
          district,
          assembly,
          booth,
          boothRule: BoothRuleList,
          constituency,
          power: taskForce,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          router.push("/login");
          toast.success("Registration Successful");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Registration Failed Account May Already Exist");
      });
  };
  return (
    <>
      <div className="form-container w-full flex justify-center items-center bg-white dark:bg-zinc-600">
        <div className="form shadow-lg mt-10">
    
          <div className="max-w-sm">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            value={name}
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your name"
          />

          {/* Email field */}
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            value={email}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your email"
          />

          {/* Password field */}
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            value={password}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your password"
          />
          {/* Phone field */}
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone
          </label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            id="phone"
            value={phone}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your phone number"
          />

       
        </div>
        <div className="max-w-sm">
          <label
            htmlFor="district"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select District
          </label>
          <select
            id="district"
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleDistrictChange(e)}
          >
            <option>Select an option</option>
            {districtList.map((district: any) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div className="max-w-sm">
          <label
            htmlFor="constituency"
            className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Constituency
          </label>
          <select
            id="constituency"
            onChange={(e) => handleConstituencyChange(e)}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Select an option</option>
            {constituencyList.map((constituency: any) => (
              <option key={constituency} value={constituency}>
                {constituency}
              </option>
            ))}
          </select>
        </div>
        <div className="max-w-sm">
          <label
            htmlFor="assembly"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Assembly
          </label>
          <select
            id="assembly"
            onChange={(e) => handleAssemblyChange(e)}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Select an option</option>
            {assemblyList.map((assembly: any) => (
              <option key={assembly} value={assembly}>
                {assembly}
              </option>
            ))}
          </select>
        </div>
        <div className="max-w-sm">
          <label
            htmlFor="booth"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Booth
          </label>
          <select
            id="booth"
            onChange={(e) => setBooth(e.target.value)}
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Select an option</option>
            {boothList.map((booth: any) => (
              <option key={booth} value={booth.number}>
                {booth.number} {booth.name}
              </option>
            ))}
          </select>
        </div>
        <div className="max-w-sm">
          <label
            htmlFor="task"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Task Force
          </label>
          <select
            id="task"
            onChange={(e) => setTaskForce(e.target.value)}
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Select an option</option>
              <option value="DTF">DTF</option>
              <option value="ATF">ATF</option>
              <option value="MTF">MTF</option>
              <option value="BTF">BTF</option>
          </select>
        </div>
        {/* <div className="max-w-sm">
          <label
            htmlFor="booth"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Booth Rule
          </label>
          {boothList.map((booth: any) => (
            <div key={booth.number}>
              <input
                type="checkbox"
                id={`booth-${booth.number}`}
                value={booth.number}
                onChange={(e) => {
                  if (e.target.checked) {
                    setBoothRule((prev) => [...prev, booth.number]);
                  } else {
                    setBoothRule((prev) =>
                      prev.filter((num) => num !== booth.number)
                    );
                  }
                }}
              />
              <label htmlFor={`booth-${booth.number}`}>
                {booth.number} {booth.name}
              </label>
            </div>
          ))}
        </div> */}
          
          <button className="button-submit" onClick={handleSubmit}>Sign Up</button>
          <p className="p">
            Already have an account?<span className="span" onClick={() => router.push("/login")}>Sign In</span>
          </p>
     
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
