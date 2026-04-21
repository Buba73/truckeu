import SubNav from "@/components/SubNav";
import BanCalculator from "@/components/BanCalculator";

export const metadata = {
  title: "Kalkulačka zákazů jízd | TruckEU",
  description: "Zjistěte, zda smíte jet v libovolný den a čas v zemích EU.",
};

export default function KalkulackaPage() {
  return (
    <>
      <SubNav active="/kalkulacka" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🧮 Kalkulačka zákazů jízd</h1>
          <p className="text-slate-400">
            Vyberte datum a čas jízdy — okamžitě uvidíte, ve kterých zemích EU platí zákaz jízdy
            pro nákladní vozidla.
          </p>
        </div>

        <BanCalculator />
      </div>
    </>
  );
}
