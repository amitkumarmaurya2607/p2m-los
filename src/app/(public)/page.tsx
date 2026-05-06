"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Shield, TrendingUp, Users, Smartphone, Mail, ArrowRight } from "lucide-react";
import Home from "@/views/Home/Home";

const page = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default page;
