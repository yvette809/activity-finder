"use client";

export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {icon && (
        <div className="mb-5 w-16 h-16 rounded-2xl bg-forest-50 text-forest-700 flex items-center justify-center">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-ink-900 mb-2">{title}</h3>
      {description && (
        <p className="text-ink-500 max-w-md mb-6">{description}</p>
      )}
      {action}
    </div>
  );
}
