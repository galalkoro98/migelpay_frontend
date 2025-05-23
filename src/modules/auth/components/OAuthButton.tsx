export default function OAuthButton({ label, Icon, onClick, color }: {
    label: string;
    Icon: React.ElementType;
    onClick: () => void;
    color: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-1/2 flex items-center justify-center gap-2 border py-2 rounded-lg text-white hover:opacity-90 ${color}`}
        >
            <Icon className="text-xl" />
            {label}
        </button>
    );
}
