export const extractMongooseError = (err) => {
    if (err.name === 'ValidationError') {
      const errorMessages = Object.values(err.errors).map((error) => error.message);
      return errorMessages.join(', ');
    }
  
    return err.message || 'An unknown error occurred';
};