export const Spinner = ({ size }: { size: string }) => {
    switch (size) {
        case "xs":
            return <span className="loading loading-spinner loading-xs"></span>;
        case "sm":
            return <span className="loading loading-spinner loading-sm"></span>;
        case "md":
            return <span className="loading loading-spinner loading-md"></span>;
        case "lg":
            return <span className="loading loading-spinner loading-lg"></span>;
        default:
            return <span className="loading loading-spinner loading-md"></span>;
    }
};
