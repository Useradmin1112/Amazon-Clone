﻿using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Models.Caterories;
using Microsoft.EntityFrameworkCore;
using Services;

namespace Infrastructure.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<int> Create(CategoryCreateVM model)
        {
            var category = _mapper.Map<CategoryCreateVM, Category>(model);
             await _categoryRepository.Create(category);
            return 000;
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            try
            {
                var categories = await _categoryRepository.Categories.Include(c => c.Subcategories).ToListAsync();
                var categoryVMs = _mapper.Map<List<Category>, List<CategoryVM>>(categories);

                return new ServiceResponse
                {
                    IsSuccess = true,
                    Payload = categoryVMs
                };
            }
            catch (Exception ex)
            {

                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = ex.Message
                };
            }

        }

        public async Task<Category> GetByIdAsync(int id)
        {
            var category = _categoryRepository.Categories.Include(c => c.Subcategories).FirstOrDefault(categ=>categ.Id==id);


            if (category != null)
            {
                return category;
            }

            return null;
        }
    }
}