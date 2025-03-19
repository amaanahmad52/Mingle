const Spinner = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <span className="loading loading-ring w-24 h-24"></span>
            <p className="mt-4 text-lg font-semibold text-gray-600 animate-pulse">Loading...</p>
        </div>
    );
}

export default Spinner;
