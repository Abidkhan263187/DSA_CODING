"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "./api";
import { readCache, writeCache } from "./queryCache";

export function useCachedApi(path) {
  const [data, setData] = useState(() => readCache(path));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(() => !readCache(path));
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    let live = true;
    const cached = readCache(path);

    if (cached) {
      setData(cached);
      setLoading(false);
    } else {
      setLoading(true);
    }

    api(path)
      .then((res) => {
        writeCache(path, res);
        if (!live) return;
        setData(res);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        if (!live) return;
        setError(err);
        setLoading(false);
      });

    return () => {
      live = false;
    };
  }, [path]);

  const retry = useCallback(async () => {
    setRetrying(true);
    try {
      const res = await api(path);
      writeCache(path, res);
      setData(res);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setRetrying(false);
      setLoading(false);
    }
  }, [path]);

  function update(next) {
    const value =
      typeof next === "function" ? next(readCache(path) ?? data) : next;
    writeCache(path, value);
    setData(value);
  }

  return { data, error, loading, retrying, setError, update, retry };
}
