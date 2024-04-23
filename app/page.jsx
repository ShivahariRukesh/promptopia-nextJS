import Feed from "@/components/Feed";

const Home = () => {
  return (
    <>
      <div className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Free Share, Know More
          {/*(underscored naming are all customized css) here "head_text" is the customized naming css that has its own styling. You can see on styles/global.css and search head_text*/}
          <br className="max-md" />
          <span className="greyred_gradient">Promptopia!</span>
        </h1>
        <p className="mt-3  text-red-800">
          You're on a right place to test out your prompt skills on AI.
        </p>
        <Feed />
      </div>
    </>
  );
};

export default Home;
