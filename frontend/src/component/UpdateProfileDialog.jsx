import React, { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "../redux/authSlice";
import { toast } from "react-toastify";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup when modal closes
    };
  }, [open]);

  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    PhoneNumber: user?.PhoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: Array.isArray(user?.profile?.skills) ? user.profile.skills : [], // Ensure it's an array
    file: user?.profile?.resume || null,
  });

  const fileChangeHandler = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setInput((prevInput) => ({
      ...prevInput,
      file: file,
    }));
  };
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("PhoneNumber", input.PhoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true)
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false)
    }
    setOpen(false);
    console.log(input);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000090] h-screen overflow-hidden">
      <div className="w-[40%] bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Update Profile</h1>
          <div
            className="text-xl cursor-pointer"
            onClick={() => setOpen(false)}
          >
            X
          </div>
        </div>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <input
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                className="border border-gray-400 p-3 rounded-sm col-span-3"
                id="name"
                name="name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <input
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                className="border border-gray-400 p-3 rounded-sm col-span-3"
                id="email"
                name="email"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="number" className="text-right">
                Number
              </label>
              <input
                type="number"
                value={input.PhoneNumber}
                onChange={changeEventHandler}
                className="border border-gray-400 p-3 rounded-sm col-span-3"
                id="number"
                name="number"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bio" className="text-right">
                Bio
              </label>
              <input
                type="text"
                value={input.bio}
                onChange={changeEventHandler}
                className="border border-gray-400 p-3 rounded-sm col-span-3"
                id="bio"
                name="bio"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="skills" className="text-right">
                Skills
              </label>
              <input
                type="text"
                value={input.skills}
                onChange={changeEventHandler}
                className="border border-gray-400 p-3 rounded-sm col-span-3"
                id="skills"
                name="skills"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="file" className="text-right">
                Resume
              </label>
              <input
                type="file"
                onChange={fileChangeHandler}
                accept="application/pdf"
                className="border border-gray-400 p-3 rounded-sm col-span-3"
                id="file"
                name="file"
              />{" "}
            </div>
          </div>
          <div>
            {loading ? (
              <button className="w-full my-4 bg-black text-white py-2 rounded-2xl flex gap-3 items-center justify-center h-full">
                <LuLoaderCircle className="h-4 w-4 animate-spin" /> please wait
              </button>
            ) : (
              <button
                type="submit"
                className="w-full my-4 bg-black text-white py-2 rounded-2xl"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileDialog;
