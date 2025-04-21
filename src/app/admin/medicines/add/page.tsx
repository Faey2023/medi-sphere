import CreateMedicineForm from '@/components/Products/CreateMedicineForm';

export default function AddPage() {
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <CreateMedicineForm />
      </div>
    </div>
  );
}
