import { merge } from 'lodash';

import userResolvers from './user';
import s3Resolvers from './s3';

const resolvers = merge(userResolvers, 
                        s3Resolvers);

export default resolvers;