import Link from "next/link";

const TrainerCard = ({ trainer }) => {
  return (
    <div className=" p-4 mb-4 shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
      <Link href={`/trainers/${trainer._id}`}>
        <img
          src={trainer.image}
          alt={`${trainer.firstName} ${trainer.lastName}'s pic`}
          className="w-full h-40 object-cover rounded mb-2"
        />
        <h2 className="text-xl font-semibold mb-2">
          {trainer.firstName} {trainer.lastName}
        </h2>
        <p className="text-gray-600 mb-2">Email: {trainer.email}</p>
        <p className="text-gray-600 mb-2">
          Specialisation: {trainer.specialisation}
        </p>
        <p className="text-gray-600 mb-2">
          Experience: {trainer.experience} years
        </p>
        <p className="text-gray-600 mb-2">Role: {trainer.role}</p>
      </Link>
    </div>
  );
};

export default TrainerCard;
