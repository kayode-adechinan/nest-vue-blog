import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDTO } from './dto/post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<PostDocument>,
  ) {}

  async addProduct(postDTO: PostDTO): Promise<Post> {
    const newPost = new this.postModel(postDTO);
    return await newPost.save();
  }

  async findAll(page = 1): Promise<any> {
    // return await this.postModel.find().sort({ updatedAt: -1 });

    const recordsPerPage = 10;
    const start = (page - 1) * recordsPerPage;

    const count = await this.postModel.count();

    const totalPages = Math.round(count / recordsPerPage);

    const posts = await this.postModel
      .find()
      .sort({ updatedAt: -1 })
      .skip(start)
      .limit(recordsPerPage);

    /*const items = await ItemModel.find(conditions)
      .skip(start)
      .limit(recordsPerPage);
*/

    return {
      totalPages: totalPages,
      currentPage: page,
      totalItems: count,
      totalItemsPerPage: recordsPerPage,
      posts: posts,
    };

  }

  async find(id: string): Promise<Post> {
    return await this.postModel.findById(id).exec();
  }

  async update(id: string, postDto: PostDTO): Promise<Post> {
    return await this.postModel.findByIdAndUpdate(id, postDto);
  }

  async delete(id: string): Promise<Post> {
    return await this.postModel.findByIdAndRemove(id);
  }

  async deleteAll(): Promise<void> {
    return await this.postModel.deleteMany();
  }
}
