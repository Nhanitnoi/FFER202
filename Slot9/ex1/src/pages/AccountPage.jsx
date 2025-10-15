// src/pages/AccountPage.jsx
import React, { useState } from "react";
import { Container, Card, ProgressBar, Button } from "react-bootstrap";
import SiteNav from "../Components/NavBar/SiteNav";
import AboutForm from "../Components/Account/AboutForm";
import AccountForm from "../Components/Account/AccountForm";
import AddressForm from "../Components/Account/AddressForm";

export default function AccountPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({}); // collect data from forms

  const progress = step === 1 ? 33 : step === 2 ? 67 : 100;

  const handleNext = (formData) => {
    setData(prev => ({...prev, ...formData}));
    setStep(s => Math.min(3, s+1));
  };

  const handlePrev = () => setStep(s => Math.max(1, s-1));

  const handleFinish = (formData) => {
    const final = {...data, ...formData};
    console.log("FINAL PROFILE", final);
    alert("Profile submitted (see console)");
    setStep(1);
    setData({});
  };

  return (
    <>
      <SiteNav />
      <Container className="my-4">
        <Card className="p-3">
          <h4>Build Your Profile</h4>
          <ProgressBar now={progress} className="mb-3" />

          {step === 1 && <AboutForm initial={data} onNext={handleNext} />}
          {step === 2 && <AccountForm initial={data} onNext={handleNext} onPrev={handlePrev} />}
          {step === 3 && <AddressForm initial={data} onPrev={handlePrev} onFinish={handleFinish} />}
        </Card>
      </Container>
    </>
  );
}
