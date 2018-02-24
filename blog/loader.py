import os
from lxml import html
from lxml import etree
import webbrowser
import re

posts_folder = "posts"
blog_page = "index.html"

class Post(object):

	__title = ""
	__date = ""
	__tags = ""
	__content = ""

	def __init__(self, title, date, tags, content):
		self.__title = title
		self.__date = date
		self.__tags = tags
		self.__content = content

	def getTitle(self):
		return self.__title

	def getDate(self):
		return self.__date

	def getTags(self):
		return self.__tags

	def getContent(self):
		return self.__content

	def toString(self):
		return "'{}' blog post was created at {} and has the following tags: {}".format(self.__title, self.__date, self.__tags)


def get_posts(folder):
	posts = []
	files = os.listdir(folder)

	for file in files:
		if file == ".DS_Store":
			continue
		with open(folder + "/" + file, "rt") as post:
			tree = etree.parse(post)
			title = tree.xpath("//title/text()")
			date = tree.xpath("//date/text()")
			tags = tree.xpath("//tags/text()")
			content = tree.xpath("//content/text()")
			contentParagraphs = re.sub(r'([\w\d !.\',]+)', r'<p>\1</p>', content[0])
			posts.append(Post(title[0], date[0], tags[0], contentParagraphs))

	return posts


def read_template(template):
	html_string = ""
	with open(template, "rb") as html_file:
		for line in html_file:
			html_string += ''.join(line)
	return html_string


def create_blogposts(posts, post_template):
	content = ""
	for post in posts:
		content += post_template.format(title=post.getTitle(), date=post.getDate(), content=post.getContent())
	return content


def create_blogpage(posts, filename, blog_template, post_template):
	file = open(filename, "w")

	rendered_content = blog_template.format(blog_posts=create_blogposts(posts, post_template))
	file.write(rendered_content)
	file.close()

	return file.name


def open_blogpage(filename):
	url = os.path.abspath(filename)
	webbrowser.open("file://" + url, new=2)


def build_blogpage(posts, filename, blog_template, post_template):
	open_blogpage(create_blogpage(posts, filename, blog_template, post_template))


def main():
	posts = get_posts(posts_folder)
	blog_template = read_template("blog_template.html")
	post_template = read_template("post_template.html")
	build_blogpage(posts, blog_page, blog_template, post_template)


if __name__ == "__main__":
	main()

