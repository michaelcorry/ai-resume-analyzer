const ScoreCircle = ({score = 75}: { score: number }) => {
    const radius = 40;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const progress = score / 100;
    const strokeDashoffset = circumference * (1 - progress);

    const strokeColor = score > 69 ? "#10b981" : score > 49 ? "#f59e0b" : "#ef4444";

    return (
        <div className="relative w-[100px] h-[100px]">
            <svg
                height="100%"
                width="100%"
                viewBox="0 0 100 100"
                className="transform -rotate-90"
            >
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    stroke="#94a3b8"
                    strokeWidth={stroke}
                    fill="transparent"
                    opacity="0.3"
                />
                <circle
                    cx="50"
                    cy="50"
                    r={normalizedRadius}
                    stroke={strokeColor}
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-semibold text-sm">{`${score}/100`}</span>
            </div>
        </div>
    );
};

export default ScoreCircle;
