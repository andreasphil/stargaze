import { InjectionKey } from "vue";

/* -------------------------------------------------- *
 * GitHub API                                         *
 * -------------------------------------------------- */

export type Repository = {
  id: string;
  name: string;
  url: string;
  description: string;
  homepageUrl: string;
  owner: {
    login: string;
    url: string;
    avatarUrl: string;
  };
};

/* -------------------------------------------------- *
 * Toasts                                             *
 * -------------------------------------------------- */

export type ToastOptions = {
  type: "warning";
};

export type Toast = {
  text: string;
  id: number;
} & ToastOptions;

export type Toaster = (text: string, options?: Partial<ToastOptions>) => void;

export const ToasterProvider: InjectionKey<Toaster> = Symbol();
