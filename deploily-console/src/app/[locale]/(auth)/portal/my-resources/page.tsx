"use client";
import { useI18n } from "../../../../../../locales/client";
import MyRessourcesPageContent from "./containers/myRessourcePageContent";

export default function Page() {
  const t = useI18n();
  return (
    <MyRessourcesPageContent />
  );
}
