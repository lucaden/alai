"use client";
import Header from "@/components/includes/header";
import BodyText from "@/components/molecules/bodyText";
import Button from "@/components/molecules/button";
import H4 from "@/components/molecules/headings/h4";
import Input from "@/components/molecules/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiArrowLeft } from "react-icons/hi";
import NoPolicyImg from "../../assets/img/img.png";
import Image from "next/image";
import { CiFileOn } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withAuth from "@/utils/withAuth";
import { validateFullName } from "@/utils/commonFunction";

const Dshboard = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    listUploadedFiles,
    updateUser,
    deleteFile,
  } = useAuth();
  const [userData, setUserData] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [policyList, setPolicyList] = useState([]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange", defaultValues: userData });

  const onSubmit = async (data) => {
    setSubmit(true);
    const response = await updateUser(data.firstName, data.lastName);
    if (response) {
      toast.success("User updated successfully", { autoClose: 1500 });
      setSubmit(false);
    } else {
      toast.error("Failed to update user", { autoClose: 1500 });
      setSubmit(false);
    }
  };
  const [submit, setSubmit] = useState();
  const [visible, setVisible] = useState("Profile");

  const navLinks = [
    { href: "#", label: "Profile" },
    { href: "#", label: "Policy" },
  ];
  const selectActiveLinks = (activeSection) => {
    setVisible(activeSection);
  };

  const fetchUploadFiles = async () => {
    try {
      const response = await listUploadedFiles();
      setPolicyList(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.clear();
      setIsAuthenticated(false);
    } catch (error) {
      toast.error("Failed to Logout", { autoClose: 1500 });
    }
  };

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (fileId) => {
    try {
      const response = await deleteFile(fileId);
      if (response) {
        await fetchUploadFiles();
      }
    } catch (error) {
      toast.error("Failed to delete the file", { autoClose: 1500 });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isAuthenticated) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUserData(user);
      reset(user);
      fetchUploadFiles();
    }
  }, [isAuthenticated, reset]);

  return (
    <main className="">
      <Header />
      <ToastContainer />
      <div className="relative h-full overflow-hidden bg-secondary before_grad after_grad">
        <div className="container relative z-[2]">
          <div className="flex items-center justify-start py-6">
            <button
              className="flex items-center justify-start cursor-pointer w-fit"
              onClick={() => router.push("/")}
            >
              <HiArrowLeft color={"#fff"} size={18} />
              <BodyText
                text="Back to website"
                additionalClass="pl-2 !text-[16px]"
              />
            </button>
          </div>
          <div className="max-w-[1140px] mx-auto mb-12">
            <div className="flex min-h-[400px] md:h-[calc(100vh_-_200px)] md:max-h-[calc(100vh_-_201px)] h-full mx-[-16px] md:flex-row flex-col">
              <div className="left_siebar md:w-[382px]  px-[8px] flex flex-col md:mb-0 mb-4">
                <div className="bg-[#010b1b] rounded-[16px] flex-1 p-4">
                  <ul>
                    {navLinks.map((link) => (
                      <li key={link.label} className="py-2">
                        <Link
                          href={link.href}
                          onClick={() => selectActiveLinks(`${link.label}`)}
                          className={`px-5 py-6 text-[18px] font-medium rounded-[12px] block ${
                            visible == link.label
                              ? "text-primary bg-[#0e2d58]"
                              : "text-white"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  label="Logout"
                  onClick={() => handleLogout()}
                  additionalClass="rounded-[8px] !bg-[#010b1b] !border-[#010b1b] mt-4 py-5 text-start leading-[30px]"
                  textClass="!text-[18px] font-medium"
                />
              </div>
              <div className="right_asidebar md:w-[calc(100vh_-_382px)] flex-1 px-[8px] flex direction-column">
                <div className="bg-[#010b1b] rounded-[16px] flex-1 px-6 md:py-12 py-6">
                  {visible == "Profile" ? (
                    <>
                      <H4 label="Details" additionalClass="mb-8" />
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-[24px] gap-[20px] flex flex-col"
                      >
                        <Input
                          inputProps={register("firstName", {
                            required: {
                              value: true,
                              message: "Field required!",
                            },
                            validate: (value) => {
                              const validation = validateFullName(value);
                              return validation.isValid || validation.message;
                            },
                          })}
                          LabelClass="text-secondary"
                          placeholder="Enter your first name here"
                          errors={errors}
                        />
                        <Input
                          inputProps={register("lastName", {
                            required: {
                              value: true,
                              message: "Field required!",
                            },
                            validate: (value) => {
                              const validation = validateFullName(value);
                              return validation.isValid || validation.message;
                            },
                          })}
                          LabelClass="text-secondary"
                          placeholder="Enter your last name here"
                          errors={errors}
                        />
                        <Input
                          inputProps={register("phone", {
                            required: {
                              value: "true",
                              message: "Field required!",
                            },
                          })}
                          LabelClass="text-secondary"
                          placeholder="+33157324652"
                          errors={errors}
                          disabled={true}
                          additionalClass="phone-disabled-text "
                        />
                        <Button
                          disabled={!isValid || submit}
                          isSubmitting={submit}
                          label="Update"
                          type="submit"
                          textClass="font-medium"
                          additionalClass="max-w-max !gap-[8px] py-[10px] px-[18px]"
                        />
                      </form>
                    </>
                  ) : (
                    <>
                      <H4 label="My Policies" additionalClass="mb-8" />
                      {policyList?.length > 0 ? (
                        <ul className="flex flex-wrap mx-[-24px] lg:flex-row flex-col">
                          {policyList.map((item) => (
                            <li
                              key={item.fileId}
                              className="py-2 lg:w-[50%] w-ful px-[12px] mb-2 relative"
                            >
                              <div className="flex items-center justify-between w-full text-white bg-[#0d131c] border-dashed border border-[#f1f1f12e] py-2 px-3 rounded-[8px]">
                                <div className="flex items-center flex-1 max-w-[calc(100%_-_45px)]">
                                  <span className="min-w-[38px] h-[38px] bg-[#fff] flex items-center justify-center mr-3 rounded-[50%]">
                                    <CiFileOn
                                      color={"#F04438"}
                                      size={22}
                                      strokeWidth={"1"}
                                    />
                                  </span>
                                  <span className="">{item.name}</span>
                                </div>
                                <span className="w-[20px] cursor-pointer relative">
                                  <BsThreeDotsVertical
                                    color={"#0075FF"}
                                    size={20}
                                    onClick={() =>
                                      setActiveDropdown(
                                        activeDropdown === item.fileId
                                          ? null
                                          : item.fileId
                                      )
                                    }
                                  />
                                  {activeDropdown === item.fileId && (
                                    <div className="bg-[#2b2b2b] min-w-[130px] rounded-[12px] shadow overflow-hidden absolute right-[5px] top-[100%] z-[3]">
                                      <ul>
                                        <button
                                          className="flex items-center gap-x-1 p-2 border-b-[1px] border-[#434343] hover:bg-[#3f3f3f] w-full"
                                          onClick={() =>
                                            handleDownload(item.s3Path)
                                          }
                                        >
                                          <MdOutlineFileDownload
                                            color={"#fff"}
                                            size={22}
                                          />
                                          <span>Download</span>
                                        </button>
                                        <button
                                          className="flex items-center gap-x-1 p-2 hover:bg-[#3f3f3f] w-full"
                                          onClick={() =>
                                            handleDelete(item.fileId)
                                          }
                                        >
                                          <BiTrash color={"#fff"} size={22} />
                                          <span>Delete</span>
                                        </button>
                                      </ul>
                                    </div>
                                  )}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="w-full md:min-h-[100vh_-_586px] h-full min-h-[300px]  flex items-center justify-center flex-col -mt-8">
                          <Image
                            src={NoPolicyImg}
                            alt="logo"
                            width="170"
                            height="170"
                            className="pb-4"
                            loading="lazy"
                          />
                          <BodyText text="No Policy Available" />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default withAuth(Dshboard);
