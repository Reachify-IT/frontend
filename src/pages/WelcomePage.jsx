
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function WelcomePage() {
    const { isAuthenticated } = useSelector((state) => state.user);    

    return (
        <>
            <div className="relative  overflow-hidden flex justify-center items-center h-screen w-screen bg-white rounded-4xl">
                <div className='center-blob-1'></div>
                <div className='center-blob-2'></div>
                <div className='relative z-20 flex items-center text-center justify-center flex-col lg:px-3 px-10'>
                    <h1 className="text-8xl lg:text-6xl font-bold text-center">Welcome to Loomify! 🚀</h1>
                    <p className='lg:text-4xl text-5xl py-5'>Automate personalized Loom videos with ease.</p>
                    <div className='flex lg:text-lg text-3xl lg:flex-row flex-col items-start lg:items-center'>
                        <p>🔹 Save time with automation</p>
                        <p>🔹 Generate bulk personalized videos</p>
                        <p>🔹 Save time with automation</p>
                    </div>
                    {!isAuthenticated ? (
                        <div className='flex flex-col pt-10'>
                            <div className='flex items-center justify-center gap-5'>
                                <Link to="/login">
                                    <button className='px-8 py-3 bg-blue-500 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 cursor-pointer font-semibold'>Login</button>
                                </Link>

                                <Link to="/sign-up">
                                    <button className='px-8 py-3 bg-blue-500 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 cursor-pointer font-semibold'>Sign Up</button>
                                </Link>
                            </div>

                        </div>
                    ):(
                        <Link to='/home'>
                        <button className=' mt-10 px-8 py-3 bg-green-500 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 cursor-pointer font-semibold'>
                        Get Started
                        </button>
                        </Link>
                    )}

                </div>
            </div>
        </>
    );
}

export default WelcomePage;
