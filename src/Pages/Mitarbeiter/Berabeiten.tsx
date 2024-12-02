import LoadingSpinner from "@/components/LoadingSpinner";
import {
  getUser,
  Mitarbeiter,
  updateUser,
  UpdateUserArgs,
} from "@/db/Mitarbeiter";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function MitarbeiterBearbeiten() {
  const { mid } = useParams();
  const navigate = useNavigate();
  const [mitarbeiter, setMitarbeiter] = useState<
    undefined | null | Mitarbeiter
  >(undefined);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof UpdateUserArgs>>({
    resolver: zodResolver(UpdateUserArgs),
    defaultValues: {
      Azubi: mitarbeiter?.Azubi.Bool ?? false,
      Email: mitarbeiter?.Email.String ?? "",
      FestnetzAlternativ: mitarbeiter?.Festnetzalternativ.String ?? "",
      FestnetzPrivat: mitarbeiter?.Festnetzprivat.String ?? "",
      Geburtstag: mitarbeiter?.Geburtstag.Time ?? undefined,
      Gruppenwahl: mitarbeiter?.Gruppenwahl.String ?? "",
      HomeOffice: mitarbeiter?.Homeoffice.String ?? "",
      id: mitarbeiter?.ID,
      InternTelefon1: mitarbeiter?.Interntelefon1.String ?? "",
      InternTelefon2: mitarbeiter?.Interntelefon2.String ?? "",
      MobilBusiness: mitarbeiter?.Mobilbusiness.String ?? "",
      MobilPrivat: mitarbeiter?.Mobilprivat.String ?? "",
      Name: mitarbeiter?.Name,
      Short: mitarbeiter?.Short.String ?? "",
    },
  });

  useEffect(() => {
    async function x() {
      if (mid == null) return;
      const user = await getUser({ id: mid });
      setMitarbeiter(user);
      setLoading(false);
    }

    void x();
  }, [mid]);

  const onSumit = async (values: z.infer<typeof UpdateUserArgs>) => {
    const res = await updateUser(values);
    if (res) {
      navigate("/Mitarbeiter");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h1 className="mb-4">{mitarbeiter?.Name} bearbeiten</h1>
    </>
  );
}
