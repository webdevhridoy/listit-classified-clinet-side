import React from 'react';
import useTitle from '../../Hook/useTitle';

const Blog = () => {
    useTitle('Blog');
    return (
        <div>
            <div className="hero h-[120px] md:h-[150px]" style={{ backgroundImage: `url("https://i.ibb.co/Jqmn6hT/bannerbg.png")` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div >
                        <h1 className="mb-5 text-3xl md:text-7xl font-bold">Our Blogs</h1>
                    </div>
                </div>
            </div>
            <div className='mt-10'>
                <div className="p-6 overflow-hidden rounded-lg shadow-md  text-gray-900  my-3">
                    <article>
                        <h2 className="text-xl font-bold">What are the different ways to manage a state in a React application?</h2>
                        <p className="mt-4  text-gray-700">When we talk about state in our applications, it’s important to be clear about what types of state actually matter.</p>
                        <p className="mt-4  text-gray-700">There are four main types of state you need to properly manage in your React apps:</p>
                        <li>Local state</li>
                        <li>Global state</li>
                        <li>Server state</li>
                        <li>URL state</li>
                    </article>
                </div>
                <div className="p-6 overflow-hidden rounded-lg shadow-md  text-gray-900  my-3">
                    <article>
                        <h2 className="text-xl font-bold">How does prototypical inheritance work?</h2>
                        <p className="mt-4  text-gray-700">In programming, we often want to take something and extend it. For instance, we have a user object with its properties and methods, and want to make admin and guest as slightly modified variants of it. We’d like to reuse what we have in user, not copy/reimplement its methods, just build a new object on top of it. Prototypal inheritance is a language feature that helps in that.</p>
                    </article>
                </div>
                <div className="p-6 overflow-hidden rounded-lg shadow-md  text-gray-900  my-3">
                    <article>
                        <h2 className="text-xl font-bold">What is a unit test? Why should we write unit tests?</h2>
                        <p className="mt-4  text-gray-700">Unit tests generally exercise the functionality of the smallest possible unit of code (a method, class, or component) in a repeatable way. Better code, faster.</p>
                        <p className="mt-4  text-gray-700">Unit tests are typically created by developers during the coding phase of a project, and are written as code that exists in the codebase alongside the application code it is testing. Many unit testing frameworks exist that help developers manage and execute unit tests.</p>
                    </article>
                </div>
                <div className="p-6 overflow-hidden rounded-lg shadow-md  text-gray-900  my-3">
                    <article>
                        <h2 className="text-xl font-bold">React vs. Angular vs. Vue?</h2>
                        <p className="mt-4  text-gray-700">Angular, React, and Vue are the most popular frameworks for any project that has something to do with JavaScript, from creating mobile, small-scale applications to building intuitive user interfaces for business web apps. However, before going into the actual comparison, I will guide you through the essential aspects and history of each JS Framework.</p>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default Blog;