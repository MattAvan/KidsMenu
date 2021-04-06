import React, { useEffect } from "react";
import { useRecoilState, useRecoilCallback } from "recoil";
import { toSaveState } from "../state";

const ToSave = () => {
  const [toSaveArray, setToSave] = useRecoilState(toSaveState);
  useEffect(async () => {
    if (toSaveArray.length > 0) {
      for (const toSaveElement of toSaveArray) {
      }
    }
  });

  return null;
};
