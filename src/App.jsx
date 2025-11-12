import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Routering from "./Router";
import { Type } from "./Utility/action.type";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { createClient } from "@supabase/supabase-js";
import "./i18n"; // Import i18n configuration

const supabase = createClient(
  "https://svoaabrejgopvzhlnpxv.supabase.co",
  "your-supabase-key"
);

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch({
        type: Type.SET_USER,
        user: session?.user || null,
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch({
        type: Type.SET_USER,
        user: session?.user || null,
      });
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return <Routering />;
}

export default App;
