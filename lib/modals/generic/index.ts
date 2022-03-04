import type { NextPage } from "next";

type Layout = {
    Layout: React.ReactNode;
};

export type NextPageWithLayout = NextPage & Layout;
