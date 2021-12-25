import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Input, Button } from "@components/UI";
import { GOALS_ROUTES } from "@lib/routes"

const Spacer: React.FC = () => <div style={{ marginTop: '3rem' }}></div>

const isValidUsername = (username: string) => {
    if (!username) return false;
    return username.length < 2;
}

const SelectCategories: NextPage = () => {
    const [username, setUsername] = useState("");
    const router = useRouter();
    const handleOnChange = (e) => {
        const { value } = e.target as HTMLInputElement;
        setUsername(value);
    }
    const error = isValidUsername(username);
    return (
        <div>
            Goals settings - categories selection
            <Input error={isValidUsername(username)} name='username' type="text" value={username} onChange={handleOnChange} />
            {error && <p>Username must be at least 2 characters long</p>}
            <Spacer />
            <Button handleOnClick={() => { router.push(GOALS_ROUTES.GOAL_FEED) }} disabled={!username.trim() || isValidUsername(username)} >Submit</Button>
        </div>
    );
};

export default SelectCategories;
