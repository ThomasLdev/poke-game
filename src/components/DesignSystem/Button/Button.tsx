interface ButtonContext {
    isDisabled: boolean;
    onClick: () => void | null;
    text: string;
}

export function Button({isDisabled, onClick, text}: ButtonContext) {
    const baseClass = 'px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer ';
    const activeClass = 'text-slate-300 hover:border-yellow-500/50 transition-colors';
    const inactiveClass = 'text-slate-500';

    return (
        <button className={baseClass + (isDisabled ? inactiveClass : activeClass)}
                disabled={isDisabled}
                onClick={onClick}
        >
            {text}
        </button>
    );
}