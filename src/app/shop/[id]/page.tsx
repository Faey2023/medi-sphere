import MedicineDetails from '@/components/Medicine/MedicineDetails';

export default async function MedicineDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <MedicineDetails id={id} />
    </div>
  );
}
