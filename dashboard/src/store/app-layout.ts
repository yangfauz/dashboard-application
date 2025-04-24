"use client";
import { create } from "zustand";

const AppLayoutStore = create<boolean>(() => false);

export default AppLayoutStore;
