const sanitizeHtml = require("sanitize-html");
const { blog } = require("../../Database/index");

const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      author,
      coverImage,
      published = false,
      publishedAt,
    } = req.body;

    //using senitize html libary to prevent the xss attack
    const cleancontent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([img, h1, h2]),

      allowedAttributes: {
        a: ["href", "name", "target", "rel"],
        img: ["src", "alt", "title", "width", "height"],
      },
    });

    const createingBlog = await blog.create({
      title,
      content: cleancontent,
      author,
      published,
      publishedAt: Date.now(),
    });

    await blog.populate("author", "name");

    return res.status(201).json({
      message: "blog created",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports={createBlog}