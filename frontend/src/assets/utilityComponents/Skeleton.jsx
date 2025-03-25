const Skeleton = () => {
    return (
        <div className="mb-20  scale-110 flex flex-col items-center justify-center h-screen">
            <div className="flex items-center gap-6">
                <div className="skeleton h-24 w-24 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4 items-center">
                    <div className="skeleton h-6 w-32"></div>
                    <div className="skeleton h-6 w-40"></div>
                </div>
            </div>
            <div className="skeleton h-48 w-80 rounded-lg"></div>
        </div>
    );
};

export default Skeleton;
